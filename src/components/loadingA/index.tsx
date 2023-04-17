// import React from "react";
// React.FC<any>

import * as S from "./styles";

interface IIsloading {
  color?: string,
  size?: number
}

export default function IsLoading({color, size}: IIsloading){
  return(
    <S.IsLoading color={color} size={size}/>
  )
}