import cls from './InitPageLoader.module.scss';

export const InitPageLoader = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.spinner} />
    </div>
  );
};
