import {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch(){
    
  if(input === ''){
    alert("Digite o CEP !")
    return;
  }
  try {
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput('');

  }catch{
    alert("Ops ,houve um erro na busca !");
    setInput("");
  }


  }

  return (
    <div className="container">
      <h1 className="title">SEJA BEM VINDO</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="DIGITE SEU CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      
      </div>
      {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>CEP: {cep.cep}</h2> 

        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>)}

    </div>
  );
}

export default App;
