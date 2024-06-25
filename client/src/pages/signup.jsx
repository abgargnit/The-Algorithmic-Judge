import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  // we will create a piece of state..
  const [formData, setFormData] = useState({}); // formData is to sav the items and setForm Data to change it 
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value}) 
  }
  const onSubmitHandler = async (e) =>{
    e.preventDefault(); // this will prevent the default behaviour of reloading the page...
    // how will we submit it?
    try {
      const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(formData),
      })
      // we added proxy at vite.config.js file for server
      const data = await res.json();
    } catch (error) {
      
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-x; font-semibold dark:text-white'>
            The
            <span className='px-2 py-1 text-4xl'>Algorithmic</span>
            Judge
            </Link>
        </div>
        {/* right */}

        <div className='flex-1' onSubmit={onSubmitHandler}> 
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>
            <Button color='gray' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}