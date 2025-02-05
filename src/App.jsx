import { useState , useCallback , useEffect , useRef} from 'react'

import './App.css'

function App() {
  const[length , setLength] = useState(8);

  const[numAllow , setNumAllow] = useState(false);
  const[charAllow , setCharAllow] = useState(false);

  const[password , setPassword] = useState("a");

  // useRef hook
  const passwordRef = useRef(null)
  

  const passwordGenerator = useCallback(  () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllow) str += "0123456789"
    if(charAllow) str += "!@#$%^&*(){}[]"

    for(let i = 1; i <= length;i++){
      let charR = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(charR)

    }

    setPassword(pass) 

  }, [length , numAllow , charAllow , setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password)
  },
  [password])

  
  useEffect(() => {
    passwordGenerator()
  }, [length , numAllow , charAllow])

  return (

    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-4 my-8 text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordRef} readOnly/>

          <button onClick = {copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3.5 pt-0.2 shrink-0'>copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }}/>

            <label htmlFor="length">Length: {length}</label>

          </div>

          {/* Check box */}
          {/* number */}

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numAllow} id='numberInput' onChange={() =>{
              setNumAllow((prev) => !prev)
            }} /> <label htmlFor="numbers">Numbers</label>
          </div>

          {/* Character */}
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} id='numberInput' onChange={() =>{
              setCharAllow((prev) => !prev)
            }} /> <label htmlFor="numbers">Character</label>

          </div>



        </div>

      </div>
    </>
  )
}

export default App
