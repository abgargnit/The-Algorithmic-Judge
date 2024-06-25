import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  // we will create a piece of state..
  const [formData, setFormData] = useState({}); // formData is to sav the items and setForm Data to change it 
  // now we will handle error 
  const [errorMessage, seterrorMessage] = useState(null);
  // use loading effect 
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();


  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()}) 
  }
  const onSubmitHandler = async (e) =>{
    e.preventDefault(); // this will prevent the default behaviour of reloading the page...
    // how will we submit it?
    if(!formData.username || !formData.email || !formData.password){
      return seterrorMessage('All details are required !')
    }
    try {
      setloading(true);
      seterrorMessage(null);
      const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(formData),
      })
      // we added proxy at vite.config.js file for server
      const data = await res.json();
      if(data.success === false){
        return seterrorMessage(data.message);
      }
      setloading(false);
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      // this error is on client side
      seterrorMessage(error.message);
      setloading(false);
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
            <Button color='gray' type='submit' disabled={loading}>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              {
              loading ? (
                // adding spinner from flowbite..
                <>
                <Spinner size='sm'/> 
                <span className='pl-3'> Loading...</span>
                </>

                // as we are adding more then 1 html elements here we need to cover them in empty tags
              ) : 'Signin'
              }
            </Link>
          </div>
        {errorMessage && (
          <Alert className='mt-5 ' color='failure'>
            {errorMessage}
          </Alert>
        )}
        </div>
      </div>
    </div>
  );
}