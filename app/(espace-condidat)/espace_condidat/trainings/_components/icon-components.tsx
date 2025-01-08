"use client"

import React from 'react'
import { IconType } from 'react-icons';

interface Props {
    Icon?: IconType;
}

export default function IconComponent({Icon}: Props) {
  return (
    <div>
      {Icon && <Icon size={20} />}
    </div>
  )
}
