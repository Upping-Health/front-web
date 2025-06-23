import Image from 'next/image';
import React from 'react';
import LogoImg from '../../assets/logo.png';

const LogoDash = ({ type, styles }: any) => {

  const textColorClass = type === 'white' ? 'text-white' : 'text-black';
  const className = `text-4xl font-bold text-center ${textColorClass} ${styles}`;
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image src={LogoImg} alt='Logo' width={50} height={50}/>
      <h1 className={className}>
        Rede<span className="text-primary"> Apícola</span>
      </h1>

    </div>
  );
};

export default LogoDash;
