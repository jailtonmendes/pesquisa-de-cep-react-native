import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard, ActivityIndicator} from 'react-native';
import api from "./src/services/api";

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, seCepUser] = useState(null);
  const [loading, setLoading ] = useState(false);


  async function buscar() {

    if(cep == ''){
      alert('Digite um cep valido');
      setCep('');
      return;
    }  


    try {
      setLoading(true);
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      seCepUser(response.data);
      setLoading(false);

      Keyboard.dismiss(); //Fechar o teclado
      
    } catch (error) {
      setLoading(false);
      alert('Endereço não encontrado!')
      console.log('Error: ' + error)
      limpar();
    }
  }

  if(loading) {
    return(
      <View style={ {alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color="#121212" size={45}/>
      </View>
    )
  }


  function limpar() {
    setCep('');
    seCepUser(null);
    inputRef.current.focus();
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>

        <Text style={styles.text}>Digite o cep desejado</Text>

        <TextInput
        style={styles.input}
        placeholder="Ex: 79003241"
        value={cep}
        onChangeText={ (texto) => setCep(texto) }
        keyboardType="numeric"
        ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity onPress={buscar} style={[styles.botao, { backgroundColor: '#1d75cd' }]}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={limpar} style={[styles.botao, { backgroundColor: '#cd3e1d'}]}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
      <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: {  cepUser.cep }</Text>
        <Text style={styles.itemText}>Logadouro: {  cepUser.logradouro }</Text>
        <Text style={styles.itemText}>Bairro: {  cepUser.bairro }</Text>
        <Text style={styles.itemText}>Cidade: {  cepUser.localidade }</Text>
        <Text style={styles.itemText}>Estado: {  cepUser.uf }</Text>
      </View>
    }
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 80,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 18,
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
  fontSize: 22
  }

})