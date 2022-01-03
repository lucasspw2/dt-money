import { Container } from "./styles";
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';


export function Summary() {
  const { transactions } = useTransactions();
    
 const sumary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposito'){
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
    } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount; 
    }
     return acc;
 }, {
     deposits: 0,
     withdraws: 0,
     total: 0,

 })
    
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={income} alt="Entradas"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                    }).format(sumary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcome} alt="Saidas"/>
                </header>
                <strong>
                    -
                    {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                    }).format(sumary.withdraws)}
                </strong>
            </div>

            <div className="background-green">
                <header>
                    <p>Total</p>
                    <img src={total} alt="Total"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                    }).format(sumary.total)}
                </strong>
            </div>

        </Container>
    );

}