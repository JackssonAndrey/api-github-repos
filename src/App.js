import React, { useState } from 'react';
import './global.css';
import axios from 'axios';
import styled from 'styled-components';
import { FiSearch, FiLink, FiArchive, FiUsers, FiMapPin } from 'react-icons/fi';
import { Button, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

import imgUsuarioPadrao from './assets/unnamed.png';

function App() {
  const [repositorios, setRepositorios] = useState([]);
  const [inputPesquisa, setInputPesquisa] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [imgUsuario, setImgUsuario] = useState(imgUsuarioPadrao);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

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
      setOpen(true);
      return;
    }
  }

  return (
    <Container>
      <ContainerPesquisa>
        <InputPersonalizado 
          id="standard-search" 
          label="Insira o nome de usuário" 
          type="search" 
          size="small"
          value={inputPesquisa} 
          onChange={e => setInputPesquisa(e.target.value)}  
        />
        <Button 
          variant="contained" 
          color="default" 
          size="medium" 
          onClick={() => handlePesquisa(inputPesquisa)} 
          endIcon={<FiSearch />}
        >
          Pesquisar
        </Button>
      </ContainerPesquisa>
      <ContainerAlertas>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Não foi possível encontrar o usuário, tente novamente!
          </Alert>
        </Collapse>
      </ContainerAlertas>
      
      <ContainerImg>
        <Avatar alt="Imagem usuario" src={imgUsuario} className={classes.large} />
      </ContainerImg>
      <ContainerInfo>
        <h4>{dadosUsuario.name}</h4>
        <h5><a href={dadosUsuario.html_url} target="_blank" rel="noopener noreferrer">{dadosUsuario.login} <FiLink /></a></h5>
        <TextInfo>{dadosUsuario.bio}</TextInfo>
        <TextInfo>
          <FiArchive /> {dadosUsuario.public_repos} repositórios - <FiUsers /> {dadosUsuario.following} following . 
          {dadosUsuario.followers} followers
        </TextInfo>
        <TextInfo><FiMapPin /> {dadosUsuario.location}</TextInfo>
      </ContainerInfo>
      <ContainerLista>
        <Ul>
          {repositorios.map(repositorio => (
            <Li key={repositorio.id}><span>{repositorio.name} - <TextBold>{repositorio.language}</TextBold></span> 
              <a href={repositorio.html_url} target="_blank" rel="noopener noreferrer"><FiLink size={16} color="#FFF"/></a>
            </Li>
          ))}
        </Ul>
      </ContainerLista>
      <ContainerFooter>Created and developed by Jacksson Andrey.</ContainerFooter>
    </Container>    
  );
}

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const InputPersonalizado = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    width: '200px',
    marginRight: '10px',
  }
})(TextField);

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

const ContainerAlertas = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: auto;
  margin: auto;
  margin-bottom: 20px;
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
  display: flex;
  justify-content: center;
  width: 40%;
  height: 50px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
`;

const Ul = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  padding: 16px;
  border-bottom: 1px solid #4F4F4F;
  text-align: left;
`;

export default App;
