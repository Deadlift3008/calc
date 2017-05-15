import React,{Component} from 'React';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const styles = {
    container:{
        paddingBottom: "50px"
    },
    product: {
        width: "200px",
        marginRight: "20px"
    },
    price: {
        width: "100px",
        marginRight: "20px"
    },
    errorProduct: {
        position: "absolute",
        bottom: "-10px"
    },
    errorPrice: {
        position: "absolute",
        bottom: "-20px"
    }
};

export default class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
            product: "",
            price: "",
            errorProductField: "",
            errorPriceField: "",
            snackbar_open: false
        };

        this.setValue = this.setValue.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    setValue(type,e,value){
        // Пропускаем только цифры
        if(type == "price" &&
            (!value.match(/\d+/) || value.match(/\d+/)[0]!==value)
        ){
            this.setState({errorPriceField: "Только цифры 0-9"});
        }else{
            this.setState({[type]: value, errorPriceField:""});
        }

    }
    addItem(){
        let item  = {};
        item.name = this.state.product;
        item.price = this.state.price;
        // Проверки на существование
        if(item.name == ""){
            this.setState({errorProductField: "Это поле обязательно"});
            return;
        }

        if(item.price == ""){
            this.setState({errorPriceField: "Это поле обязательно"});
            return;
        }
        this.props.addItem(item);
        this.setState({
            product: "",
            price: "",
            errorProductField: "",
            errorPriceField: "",
            snackbar_open: true
        });
    }
    handleRequestClose(){
        this.setState({snackbar_open: false});
    }
    render(){
        return  <div className="add" style={styles.container}>
                    <h2 className="add__header">Добавить продукт</h2>
                    <TextField
                        hintText="Введите имя продукта"
                        floatingLabelText="Продукт"
                        style={styles.product}
                        value={this.state.product}
                        onChange={this.setValue.bind(this,"product")}
                        errorText={this.state.errorProductField}
                        errorStyle={styles.errorProduct}
                    />
                    <TextField
                        hintText="Цена"
                        floatingLabelText="Цена"
                        style={styles.price}
                        value={this.state.price}
                        onChange={this.setValue.bind(this,"price")}
                        errorText={this.state.errorPriceField}
                        errorStyle={styles.errorPrice}
                    />
                    <RaisedButton label="Добавить" primary={true} onTouchTap={this.addItem}/>
                    <Snackbar
                        open={this.state.snackbar_open}
                        message="Продукт добавлен в корзину"
                        autoHideDuration={2200}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
    }
}

Add.propTypes = {
    addItem: PropTypes.func.isRequired
};