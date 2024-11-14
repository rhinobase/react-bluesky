import { classNames } from "../../utils";
import { Container } from "../Container";
import s from "./post-loading.module.css";

export function PostLoading() {
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
        <div className={classNames(s.skeleton, s.body)} />
      </div>
    </Container>
  );
}
