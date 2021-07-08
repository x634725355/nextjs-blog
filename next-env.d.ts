/// <reference types="next" />
/// <reference types="next/types/global" />
import { ReactNode } from 'react';

declare global {
  namespace csc {
    interface Props {
      children?: ReactNode;
      title?: string;
    }
  }
}