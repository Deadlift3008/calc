import React,{Component} from 'React';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';


const styles = {
    container: {
        paddingTop: "40px"
    },
    textfield: {
        marginRight: "20px",
        marginLeft: "20px",
        width: "40px"
    },
    button: {
        marginLeft: "20px"
    },
    error:{
        position: "absolute",
        bottom: "-5px",
        width: "150px"
    }

};


export default class TableList extends Component{
    constructor(props){
        super(props);

        this.state = {
            discount: 7,
            list: [],
            error: "",
            sum: 0,
            snackbar_open: false
        };

        this.setSecondPrices = this.setSecondPrices.bind(this);
        this.setDiscount = this.setDiscount.bind(this);
        this.applyDiscount = this.applyDiscount.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    setSecondPrices(list,sum){
        // копируем полностью объект
        list = JSON.parse(JSON.stringify(list));

        let maxPrice = 0,
            remainder = 0,
            discount = this.state.discount,
            currentDiscount,
            maxIndex;


        list.forEach(function(item,i,arr){
            //Находим максимальный
            if(parseInt(item.price) > maxPrice){
                maxPrice = parseInt(item.price);
                maxIndex = i;
            }
            // считаем скидку
            currentDiscount = (parseInt(item.price)*discount)/sum;
            // остаток сохраняем
            remainder+=(currentDiscount - parseInt(currentDiscount));
            item.secondPrice = parseInt(item.price) - parseInt(currentDiscount);
            if(item.secondPrice < 0){
                item.secondPrice = 0;
            }
        });

        // даем остаток элементу с максимальной ценой
        list[maxIndex].secondPrice-=remainder;
        if(list[maxIndex].secondPrice < 0){
            list[maxIndex].secondPrice = 0;
        }

        return list;
    }
    setDiscount(e,value){
        this.setState({discount: value});
    }
    componentWillReceiveProps(nextProps){
        // сразу обрабатываем props
        // перед тем как они попадут в state
        if(nextProps.list && nextProps.sum){
            this.setState({
                list: this.setSecondPrices(nextProps.list,nextProps.sum),
                sum: nextProps.sum
            });

        }

    }
    applyDiscount(){
        let {sum,list,discount} = this.state;
        // Пропускаем только целые числа
        if(!discount.match(/\d+/) || discount.match(/\d+/)[0] !== discount){
            this.setState({error: "Только целые числа"});
            return;
        }
        // пересчитываем новые значения
        let newList = this.setSecondPrices(list,sum);
        this.setState({list: newList, error: "",snackbar_open: true});
    }
    handleRequestClose(){
        this.setState({snackbar_open: false});
    }
    render(){
        let list = this.state.list.map(function(item,i,arr){
            return  <TableRow key={i}>
                        <TableRowColumn>{item.name}</TableRowColumn>
                        <TableRowColumn>{item.price}</TableRowColumn>
                        <TableRowColumn>{item.secondPrice}</TableRowColumn>
                    </TableRow>
        });

        return  <div className="table" style={styles.container}>
                    <h2>Корзина</h2>
                    <br/>
                    <Table selectable={false}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Продукт</TableHeaderColumn>
                                <TableHeaderColumn>Цена</TableHeaderColumn>
                                <TableHeaderColumn>Цена со скидкой</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {list}
                        </TableBody>
                    </Table>
                    <br/>
                    <span>Применить скидку</span>
                    <TextField
                        hintText={this.state.discount}
                        style={styles.textfield}
                        onChange={this.setDiscount}
                        errorText={this.state.error}
                        errorStyle={styles.error}
                    />
                    <span>рублей</span>
                    <RaisedButton label="Применить" primary={true} style={styles.button} onTouchTap={this.applyDiscount}/>
                    <Snackbar
                        open={this.state.snackbar_open}
                        message="Скидка применена"
                        autoHideDuration={2200}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
    }
}


TableList.propTypes = {
    list: PropTypes.array.isRequired,
    sum: PropTypes.number.isRequired
};