import type { PostBaseType } from "./base";
import type { EmbedType } from "./embed";
import type { RecordType } from "./record";

export interface PostType extends PostBaseType {
  record: RecordType;
  embed?: EmbedType;
}
