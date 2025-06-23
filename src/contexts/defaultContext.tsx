
'use client'
import ModalFeedBackStatus from '@/components/modals/ModalFeedback';
import DefaultContextInterface from '@/interfaces/default.interface';
import FeedBackStatusInterface from '@/interfaces/feedbackStatus';
import User from '@/interfaces/user.interface';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, useCallback, useEffect, useState } from 'react';
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {

  const [user, setuser] = useState<User | null>(null);
  const [showModal, setshowModal] = useState<any>({
    open: false,
    title: '',
    description: '',
    status: '',
  })
  

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setuser(decoded as any)
        console.log(decoded);
      } catch (error) {
        setuser(null)
      }
    }
  }, []);


  const onShowFeedBack = useCallback(({ title, description, status }: FeedBackStatusInterface) => setshowModal({
    open: true,
    title, description, status
  }), [])

  
  return (
    <DefaultContext.Provider value={{
      user,
      setuser,
      onShowFeedBack
    }}>
      {children}

      <ModalFeedBackStatus 
        open={showModal.open}
        title={showModal.title}
        description={showModal.description}
        status={showModal.status}
        setIsClose={() => setshowModal({...showModal, open: false})}      
      />
    </DefaultContext.Provider>
  );
}