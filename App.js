import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';

const App = () => {
  const [precoAlcool, setPrecoAlcool] = useState('');
  const [precoGasolina, setPrecoGasolina] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularVantagem = () => {
    const alcool = parseFloat(precoAlcool);
    const gasolina = parseFloat(precoGasolina);

    if (isValidInput(alcool, gasolina)) {
      Keyboard.dismiss();
      
      const mediaAlcool = 7; 
      const mediaGasolina = 10; 
      const custoAlcool = alcool / mediaAlcool;
      const custoGasolina = gasolina / mediaGasolina;
      setResultado(custoAlcool < custoGasolina ? 'Abasteça com Álcool' : 'Abasteça com Gasolina');
    } else {
      setResultado('Por favor, insira valores válidos.');
    }
  };

  const isValidInput = (alcool, gasolina) => {
    return alcool > 0 && gasolina > 0;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Comparação de Combustível</Text>
        <Image source={require('./assets/combustivel.png')} style={styles.image} />
        <View style={styles.inputContainer}>
          {renderInput("Preço do Álcool (R$)", precoAlcool, setPrecoAlcool)}
          {renderInput("Preço da Gasolina (R$)", precoGasolina, setPrecoGasolina)}
        </View>
        <TouchableOpacity style={styles.button} onPress={calcularVantagem}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        {resultado && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{resultado}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const renderInput = (placeholder, value, onChange) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    keyboardType="numeric"
    value={value}
    onChangeText={onChange}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366', 
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#005580',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#ffffff',
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, 
  },
  button: {
    backgroundColor: 'black', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20, 
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e0f7fa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});

export default App;
