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
    }
};

export default class TableList extends Component{
    constructor(props){
        super(props);
        this.state = {
            price: 7,
            list: this.props.list
        }
    }
    render(){
        let list = this.state.list.map(function(item,i,arr){
            return  <TableRow key={i}>
                        <TableRowColumn>{item.name}</TableRowColumn>
                        <TableRowColumn>{item.price}</TableRowColumn>
                        <TableRowColumn>{item.price} - скидка</TableRowColumn>
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
                        hintText={this.state.price}
                        style={styles.textfield}
                    />
                    <span>рублей</span>
                    <RaisedButton label="Применить" primary={true} style={styles.button}/>
                </div>
    }
}