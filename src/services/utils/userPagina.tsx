import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { PageType } from '@/app/_components/Menu';

export const userPaginas: PageType[] = [
  {
    url: '/entrar',
    label: 'Profissional',
    icon: <FaUserTie />,
    isEnable: true
  }
];
