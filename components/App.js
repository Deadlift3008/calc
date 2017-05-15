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
            list: []
        };

        this.addItem = this.addItem.bind(this);
    }
    addItem(item){
        let currentList = this.state.list;
        currentList.push(item);
        this.setState({list: currentList});
    }
    render(){
        return <MuiThemeProvider>
                <div className="app">
                    <Paper style={styles} zDepth={2}>
                        <Add addItem={this.addItem} />
                        <Divider />
                        <TableList list={this.state.list} />
                    </Paper>
                </div>
               </MuiThemeProvider>
    }
}
