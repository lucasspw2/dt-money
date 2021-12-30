import { createServer } from 'miragejs';
import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import { api } from '../../services/api';

import { Container, RadioBox, TransactionTypeContainer } from './style';

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void
    }


export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposito');
    

    function handleCreateTransaction(event: FormEvent){
        event.preventDefault();
        const data = {
            title,
            value, 
            category,
            type
        };

        api.post('transactions', data)

    }

    return(
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      > 
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close" 
      >
          <img src={closeImg} alt="fechar modal" />
      </button>
        <Container onSubmit={handleCreateTransaction}>     
            <h2>Cadastrar Transação</h2>
                <input 
                    type="text" 
                    placeholder="Titulo" 
                    value={title}
                    onChange={ event => setTitle(event.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Valor" 
                    value={value}
                    onChange={ event => setValue(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox 
                        type="button" 
                        onClick={() => {setType('deposito')}}
                        isActive={type === 'deposito'}
                        activeColor="green"
                    >
                        <img src={income} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type="button" 
                        onClick={() => {setType('retirada')}}
                        isActive={type === 'retirada'}
                        activeColor="red"
                    >
                        <img src={outcome} alt="Retirada" />
                        <span>Saida</span>                    
                    </RadioBox>

                </TransactionTypeContainer>
                <input 
                    type="text" 
                    placeholder="Categoria" 
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
        </Container>
    </Modal> 
    )
}