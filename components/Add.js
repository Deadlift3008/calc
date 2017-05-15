import React,{Component} from 'React';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
    }
};

export default class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
            product: "",
            price: ""
        };

        this.setValue = this.setValue.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    setValue(type,e,value){
        this.setState({[type]: value});
    }
    addItem(){
        let item  = {};
        item.name = this.state.product;
        item.price = this.state.price;
        if(item.name == "" || item.price == "" ){
            return;
        }
        this.props.addItem(item);
        this.setState({
            product: "",
            price: ""
        });
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
                    />
                    <TextField
                        hintText="Цена"
                        floatingLabelText="Цена"
                        style={styles.price}
                        value={this.state.price}
                        onChange={this.setValue.bind(this,"price")}
                    />
                    <RaisedButton label="Добавить" primary={true} onTouchTap={this.addItem}/>
                </div>
    }
}