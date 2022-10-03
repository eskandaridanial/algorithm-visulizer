import React from "react";
import Bar from "./components/Bar";
import './App.css';

class App extends React.Component {

    state = {
        array: [],
        bars: [],
        interval: -900,
        doReset: false
    }

    componentDidMount() {
        this.setData();
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setInterval = (e) => {
        this.setState({
            interval: e.target.value
        });
    }

    setData = () => {
        this.setState({
            array: this.createArray(100 , 300 , 0),
        } , () => {
            this.setState({
                bars: this.createBars(this.state.array)
            });
        });
    }

    updateData = async (array) => {
        this.setState({
            array: array,
            bars: this.createBars(array)
        });
        await this.sleep(this.state.interval * -1);
    }

    createBars = (array) => {
        return array.map(
            (item) => {
                return (
                    <Bar length={item.length}
                         color={item.color}
                         isCurrentItem={item.isCurrentItem}/>
                );
            }
        );
    }

    createArray = (len , max , min) => {
        return Array(len)
            .fill(0)
            .map(() => (
                {
                    length: (Math.floor(Math.random() * (max - min + 1)) + min),
                    color: '#077B88',
                    isCurrentItem: false
                })
            );
    }

    selectionSort = async () => {
        let arr = this.state.array;
        for (let i = 0 ; i < arr.length; i++) {
            if (this.state.doReset)
                break;
            let low = i;
            for (let j = i + 1 ; j < arr.length; j++) {
                if (arr[j].length < arr[low].length) {
                    low = j;
                }
            }
            if (low !== i) {
                [arr[i].length, arr[low].length] = [arr[low].length, arr[i].length];
                arr[i].isCurrentItem = true;
                await this.updateData(arr);
                arr[low].isCurrentItem = true;
                await this.updateData(arr);
            }
            arr[i].isCurrentItem = false;
            arr[low].isCurrentItem = false;
        }
    }

    render() {
        return(
            <>
                <h1 className="title">ALGORITHM VISUALISER</h1>
                <div className="container">
                    {
                        this.state.bars
                    }
                </div>
                <div className="options">
                    <button onClick={this.setData}>reset data</button>
                    <button onClick={this.selectionSort}>selection sort</button>
                    <button onClick={this.bubbleSort}>bubble sort</button>
                    <button onClick={this.quickSort}>quick sort</button>
                    <button onClick={this.mergeSort}>merge sort</button>
                    <button onClick={this.insertionSort}>insertion sort</button>
                    <input type="range" min="-900" max="-100" value={this.state.interval} className="slider" id="range" onChange={this.setInterval}/>
                </div>
            </>
        );
    }
}

export default App;
