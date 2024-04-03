import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText] = useState('Copy')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    //if checkboxed value is true make the string template bigger
    if (numberAllowed) {str = str + "0123456789"}
    if (charAllowed) {str = str + "!@#$%^*()_+"}

    for(let i=0; i<length; i++) {
      //Generating a random number
      const char = Math.floor(Math.random() * str.length + 1)
      //charAt
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    generatePassword()
  },[length, numberAllowed, charAllowed])


  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    .then( () => {
      setButtonText("Copied!")
      setTimeout(() => {
        setButtonText('Copy')
      },2000)
    })

    passwordRef.current?.select()

  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#ECF4D6]'>
    <div className='w-full max-w-md shadow-2xl rounded-lg px-4 py-2 bg-[#9AD0C2]  text-[#265073]'>
      <h1 className='test-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password} 
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         <button 
         id='copy-button' 
         className='outline-none bg-[#2D9596] text-[#265073] px-3 py-0.5 shrink-0' 
         onClick={copyPasswordToClipboard}>{buttonText}
         </button>
      </div>
      <div>
        <div className='flex text-sm gap-x-2'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)} />


          <label htmlFor="length">Length: {length}</label>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          onChange={()=>{
            //used callbacks here so that 'React reacts when rapid inputs occur'
            setNumberAllowed(!numberAllowed)
          }} />
          <label htmlFor="number">Numbers</label>


          <input type="checkbox"
          defaultChecked={charAllowed}
          onChange={()=>{
            //used callbacks here so that 'React reacts when rapid inputs occur'
            setCharAllowed(!charAllowed)
          }} />
          <label htmlFor="Characters">Characters</label>
        </div>
      </div>
    </div>
  </div>
  )
}

export default App
