import { Vortex } from 'react-loader-spinner';

const LoadingSpinner = () => (
  <div className="loading-wrapper" data-testid="loading-spinner">
    <Vortex
      visible
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['blue', 'purple']}
    />
  </div>
);

export default LoadingSpinner;
