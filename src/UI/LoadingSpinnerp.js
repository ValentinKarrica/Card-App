import style from './LoadingSpinnerp.module.css';

const LoadingSpinnerp = () => {
  return <div className={style.boxSpinner}>
      <div className={style.spinner}>
          Loading ...
      </div>
    </div>
}

export default LoadingSpinnerp;