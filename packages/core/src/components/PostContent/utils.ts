import type {
  AppBskyRichtextFacet,
  Facet,
  FacetLink,
  FacetMention,
  FacetTag,
  RichTextProps,
} from "@atproto/api";
import { hasProp, isObj } from "../../utils";
import { UnicodeString } from "./unicode";

class RichTextSegment {
  constructor(
    public text: string,
    public facet?: Facet,
  ) {}

  get link(): FacetLink | undefined {
    return this.facet?.features.find(isLink);
  }

  get mention(): FacetMention | undefined {
    return this.facet?.features.find(isMention);
  }

  get tag(): FacetTag | undefined {
    return this.facet?.features.find(isTag);
  }
}

export function* rtSegments(props: Pick<RichTextProps, "text" | "facets">) {
  // Setup
  const unicodeText = new UnicodeString(props.text);
  let facets = props.facets;
  if (facets) {
    facets = facets.filter(facetFilter).sort(facetSort);
  }

  // Segmentation
  facets = facets || [];
  if (!facets.length) {
    yield new RichTextSegment(unicodeText.utf16);
    return;
  }

  let textCursor = 0;
  let facetCursor = 0;
  do {
    const currFacet = facets[facetCursor];
    if (textCursor < currFacet.index.byteStart) {
      yield new RichTextSegment(
        unicodeText.slice(textCursor, currFacet.index.byteStart),
      );
    } else if (textCursor > currFacet.index.byteStart) {
      facetCursor++;
      continue;
    }
    if (currFacet.index.byteStart < currFacet.index.byteEnd) {
      const subtext = unicodeText.slice(
        currFacet.index.byteStart,
        currFacet.index.byteEnd,
      );
      if (!subtext.trim()) {
        // dont empty string entities
        yield new RichTextSegment(subtext);
      } else {
        yield new RichTextSegment(subtext, currFacet);
      }
    }
    textCursor = currFacet.index.byteEnd;
    facetCursor++;
  } while (facetCursor < facets.length);
  if (textCursor < unicodeText.length) {
    yield new RichTextSegment(
      unicodeText.slice(textCursor, unicodeText.length),
    );
  }
}

const facetSort = (a: Facet, b: Facet) => a.index.byteStart - b.index.byteStart;

const facetFilter = (facet: Facet) =>
  // discard negative-length facets. zero-length facets are valid
  facet.index.byteStart <= facet.index.byteEnd;

function isLink(v: unknown): v is AppBskyRichtextFacet.Link {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.richtext.facet#link"
  );
}

function isMention(v: unknown): v is AppBskyRichtextFacet.Mention {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.richtext.facet#mention"
  );
}

function isTag(v: unknown): v is AppBskyRichtextFacet.Tag {
  return (
    isObj(v) && hasProp(v, "$type") && v.$type === "app.bsky.richtext.facet#tag"
  );
}
