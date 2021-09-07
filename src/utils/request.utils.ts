import { RequestContextClass } from 'src/context/requestContext.class';

export const checkIsMobile = (): boolean => {
  return RequestContextClass.getIsMobile();
};
