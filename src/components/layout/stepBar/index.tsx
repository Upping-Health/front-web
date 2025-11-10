import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { colors } from '@/lib/colors/colors'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${colors.primary} 0%, #1D1D1D 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${colors.primary} 0%, #1D1D1D 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles?.('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme }) => ({
  backgroundColor: '#6D6D6D',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage: `linear-gradient(136deg, ${colors.primary} 0%, #1D1D1D 100%)`,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.21)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage: `linear-gradient(136deg, ${colors.primary} 0%, #1D1D1D 100%)`,
      },
    },
  ],
}))

function ColorlibStepIcon(
  props: StepIconProps & { icons: React.ReactElement[] },
) {
  const { active, completed, className, icon, icons } = props
  const stepIndex = Number(icon) - 1

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[stepIndex]}
    </ColorlibStepIconRoot>
  )
}

export default function CustomizedSteppers({
  steps,
  activeTab,
}: {
  steps: { label: string; icon: React.ReactElement }[]
  activeTab: number
}) {
  const icons = steps.map((s) => s.icon)

  return (
    <Stack>
      <Stepper
        alternativeLabel
        activeStep={activeTab}
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon {...props} icons={icons} />
              )}
            >
              <p className="font-bold text-sm dark:text-white">{step.label}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
