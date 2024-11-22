import { classNames } from "../../utils";
import { Container } from "../Container";
import s from "./post-loading.module.css";

export function PostSkeleton() {
  return (
    <Container>
      <div className={s.wrapper}>
        <div className={s.header}>
          <div className={classNames(s.skeleton, s.avatar)} />
          <div className={s.nameAndHandle}>
            <div className={classNames(s.skeleton, s.headerName)} />
            <div className={classNames(s.skeleton, s.headerHandle)} />
          </div>
        </div>
        <div className={s.body}>
          <div className={classNames(s.skeleton, s.bodyItem, s.bodyItem1)} />
          <div className={classNames(s.skeleton, s.bodyItem, s.bodyItem2)} />
          <div className={classNames(s.skeleton, s.bodyItem, s.bodyItem3)} />
        </div>
      </div>
    </Container>
  );
}
