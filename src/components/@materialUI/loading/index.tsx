import {motion} from 'framer-motion';
import {varBounceIn} from '../animate/variants/bounce';

export function LoadingScreen() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className=' justify-center '>
        <motion.div
          {...varBounceIn}
        >
          <motion.text
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              opacity: [0.25, 1, 1, 1, 0.25],
            }}
            transition={{
              repeat: Infinity, duration: 3.2, ease: 'linear', repeatDelay: 1,

            }}
            className="text-primary text-3xl  __className_c4ff9d">
            Wassel
          </motion.text>
        </motion.div>
      </div>
      <motion.div
        className='absolute w-32 h-32 rounded-[25%] border-solid border-4 border-primary-50'
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{ease: 'linear', duration: 3.2, repeat: Infinity}}
      />

      <motion.div
        className='absolute w-48 h-48 rounded-[25%] border-solid border-8 border-primary'
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{
          ease: 'linear',
          duration: 3.2,
          repeat: Infinity
        }}
      />
    </div >
  );
}
