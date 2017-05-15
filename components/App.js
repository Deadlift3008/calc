import React,{Component} from 'React';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import Add from '../components/Add';
import TableList from '../components/TableList';

const styles = {
   width: "600px",
   marginLeft: "auto",
   marginRight: "auto",
   marginTop: "20px",
   padding: "20px",

};

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            sum: 0
        };

        this.addItem = this.addItem.bind(this);
    }
    addItem(item){
        let currentList = this.state.list;
        // сразу будем считать сумму, чтобы не делать потом лишнего цикла
        let sum = this.state.sum;
        currentList.push(item);
        this.setState({list: currentList, sum: sum+parseInt(item.price)});
    }
    render(){
        return <MuiThemeProvider>
                <div className="app">
                    <Paper style={styles} zDepth={2}>
                        <Add addItem={this.addItem} />
                        <Divider />
                        <TableList list={this.state.list} sum={this.state.sum}/>
                    </Paper>
                </div>
               </MuiThemeProvider>
    }
}
