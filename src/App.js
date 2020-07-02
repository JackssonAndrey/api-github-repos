import React, { useState } from 'react';
import './global.css';
import axios from 'axios';
import styled from 'styled-components';
import { FiSearch, FiLink, FiArchive, FiUsers, FiMapPin } from 'react-icons/fi';

import imgUsuarioPadrao from './assets/unnamed.png';

function App() {
  const [repositorios, setRepositorios] = useState([]);
  const [inputPesquisa, setInputPesquisa] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [imgUsuario, setImgUsuario] = useState(imgUsuarioPadrao);
  async function handlePesquisa(valor) {
    if (valor === '') {
      setRepositorios([]);
      setImgUsuario(imgUsuarioPadrao);
      setDadosUsuario({});
      return;
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${valor}/repos`);
      const {data: responseUser} = await axios.get(`https://api.github.com/users/${valor}`);
      setRepositorios(response.data);
      setDadosUsuario(responseUser);
      setImgUsuario(responseUser.avatar_url);
    } catch (error) {
      return alert('Nenhum usuário com este nome, tente novamente!');
    }
  }

  return (
    <Container>
      <ContainerPesquisa>
        <Input type="search" placeholder="Insira o nome de usuário" value={inputPesquisa} onChange={e => setInputPesquisa(e.target.value)} />
        <Button onClick={() => handlePesquisa(inputPesquisa)} >Pesquisar <FiSearch size={14} /></Button>
      </ContainerPesquisa>
      <ContainerImg>
        <Img src={imgUsuario} alt="Imagem usuario"/>
      </ContainerImg>
      <ContainerInfo>
        <h4>{dadosUsuario.name}</h4>
        <h5><a href={dadosUsuario.html_url} target="_blank" rel="noopener noreferrer">{dadosUsuario.login} <FiLink /></a></h5>
        <TextInfo>{dadosUsuario.bio}</TextInfo>
        <TextInfo><FiArchive /> {dadosUsuario.public_repos} repositórios - <FiUsers /> {dadosUsuario.following} following . {dadosUsuario.followers} followers</TextInfo>
        <TextInfo><FiMapPin /> {dadosUsuario.location}</TextInfo>
      </ContainerInfo>
      <ContainerLista>
        <Ul>
          {repositorios.map(repositorio => (
            <Li key={repositorio.id}><span>{repositorio.name} - <TextBold>{repositorio.language}</TextBold></span> <a href={repositorio.html_url} target="_blank" rel="noopener noreferrer"><FiLink size={16} color="#FFF"/></a> </Li>
          ))}
        </Ul>
      </ContainerLista>
      <ContainerFooter>Created and developed by Jacksson Andrey.</ContainerFooter>
    </Container>    
  );
}

const TextInfo = styled.p`
  font-size: 1em;
  margin: 5px;
`;

const TextBold = styled.span`
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 70vw;
  height: auto;
  box-shadow: 6px 6px 6px black;
  border-radius: 8px;
  color: #FFF;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #363636;
`;

const ContainerLista = styled.div`
  flex: 1;
  width: 50%;
  height: auto;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
`;

const ContainerInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: auto;
  margin: auto;
  text-align: center;
`;

const ContainerFooter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: auto;
  margin: auto;
  margin-bottom: 30px; 
  text-align: center;
`;

const ContainerImg = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  height: auto;
  margin: auto;
  text-align: center;
`;

const ContainerPesquisa = styled.div`
  flex: 1;
  width: 50%;
  height: 100px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
`;

const Input = styled.input`
  padding: 16px;
  outline: none;
  color: #FFF;
  background-color: #4F4F4F;
  border-radius: 8px;
  border: none;
  box-shadow: none;
  margin: 5px;
  width: 200px;
`;

const Button = styled.button`
  padding: 16px;
  outline: none;
  width: 150px;
  color: #FFF;
  background-color: #4F4F4F;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  margin: 5px;
  box-shadow: none;
  transition: opacity 0.3s;
  &:hover {
    opacity 0.7;
  } 
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  padding: 16px;
  border-bottom: 1px solid #4F4F4F;
  text-align: left;
`;

const Img = styled.img`
  border: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default App;
