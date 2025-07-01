import AutocompleteStyled from '@/components/inputsComponents/autoCompleteStyled'
import ButtonStyled from '@/components/buttonsComponents/button'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import PreFeedBack from '@/utils/feedbackStatus'
import AddIcon from '@mui/icons-material/Add'
import Person from '@mui/icons-material/Person'
import { CircularProgress, Modal, Tooltip } from '@mui/material'
import { useCallback, useContext, useMemo, useState } from 'react'
import ModalPatient from '../ModalPatient'


interface ModalParams {
  open: boolean
  setIsClose: () => void
  patientId?: number | null
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>


}

const ModalSelectPatient = ({
  open,
  setIsClose,
  patientId,
  setPatientId

}: ModalParams) => {
  const { onShowFeedBack, user } = useContext(DefaultContext)
  const [viewTwo, setViewTwo] = useState(false)
  const [loadingData, setLoadingData] = useState(false);
  const {data, loading, loadData } = useLoadPatients(!open)
  const [openModal, setOpenModal] = useState(false)
  const [patientSelected, setPatientSelected]  = useState<number | null>(null)

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Paciente cadastrado com sucesso!'))
    setIsClose()
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Paciente atualizado com sucesso!'))
    setIsClose()
  }

  const onError = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao cadastrar paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  const onErrorUpdate = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao atualizar paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  const patientSearch = useMemo(() => {
    return data.find((option) => option.id === patientId) || null
  },[data, patientId])

  return (
    <>
      <Modal
        open={open}
        className="flex justify-center items-center"
      >
        <div className="bg-white rounded-20 px-5 py-4 w-[85%] max-w-[500px]">
          <p className="font-semibold text-xl text-center uppercase pb-5">
            Selecione o paciente
          </p>

          <form className="flex flex-col gap-4">
            {loadingData ? 
              <div className='flex items-center flex-col justify-center py-6 gap-4'>
                <CircularProgress style={{ fontSize: 36, color: colors.black }} />
                <p className="text-black font-semibold">Buscando dados...</p>
              </div>
            
            :
            <>
              <div className="flex flex-col gap-2">
                <div className='flex items-center w-full gap-4'>
                  <AutocompleteStyled
                    id="patient"
                    label="Paciente"
                    icon={<Person style={{ color: colors.black }} />}
                    placeholder="Selecione o paciente"
                    value={patientSearch}
                    options={data}
                    getOptionLabel={(option) => option.name}
                    onChange={(event: any, newValue: any) => {
                      setPatientSelected(newValue?.id);
                    }}
                    
                  />
              <Tooltip
              
              
              componentsProps={{

                tooltip: {
                  sx: {
                    backgroundColor: colors.white, 
                    color:colors.black,         
                    fontSize: '0.875rem',     
                    fontWeight: '500',         
                    padding: '8px 16px',       
                    borderRadius: '8px',     
                  },
                },
        
                arrow: {
                  sx: {
                    color: colors.black, 
                  },
                },
              }}
                title="Adicionar novo paciente" >
                  <button
                    type="button"
                    onClick={toggleModalOpen}
                    className="bg-primary rounded-xl mt-6 w-14 h-14 flex items-center justify-center"
                  >
                    <AddIcon style={{ color: colors.white, fontSize: 32 }} />
                  </button>
                </Tooltip>

                
                </div>
               


              
                <div className="flex gap-5 pt-5">
                
                  {loading ? (
                    <ButtonStyled
                      bgColor="bg-darkGray"
                      textColor="text-white"
                      type="submit"
                      styles="w-full"
                      title="Cadastrando..."
                      icon={
                        <CircularProgress
                          style={{ width: 20, height: 20, color: '#FFFFFF' }}
                        />
                      }
                    />
                  ) : (
                    <ButtonStyled
                      type="button"
                      styles="w-full"
                      title={'Confirmar'}
                      onClick={() => {
                        if(!patientSelected) {
                          return onShowFeedBack(PreFeedBack.error('Selecione um paciente para continuar'))
                        }
                        setIsClose();
                        setPatientId(patientSelected);
                
                      }}
                    />
                  )}
                </div>
              </div>

              </>
          }

          </form>
        </div>


      </Modal>
      <ModalPatient
        open={openModal}
        setIsClose={toggleModalOpen}
        loadData={loadData}
      />
    </>
  )
}

export default ModalSelectPatient
