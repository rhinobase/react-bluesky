import { classNames } from "../../utils";
import { Container } from "../Container";
import s from "./post-loading.module.css";

export function PostSkeleton() {
  return (
    <Container>
      <div class={s.wrapper}>
        <div class={s.header}>
          <div class={classNames(s.skeleton, s.avatar)} />
          <div class={s.nameAndHandle}>
            <div class={classNames(s.skeleton, s.headerName)} />
            <div class={classNames(s.skeleton, s.headerHandle)} />
          </div>
        </div>
        <div class={s.body}>
          <div class={classNames(s.skeleton, s.bodyItem, s.bodyItem1)} />
          <div class={classNames(s.skeleton, s.bodyItem, s.bodyItem2)} />
          <div class={classNames(s.skeleton, s.bodyItem, s.bodyItem3)} />
        </div>
      </div>
    </Container>
  );
}
