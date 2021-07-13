import { useEffect } from "react";
import { connect } from "react-redux";
import { addText } from "../../redux/action";
import Layout from "../../components/Layout/layout";
interface Props extends csc.Props {
    num: number;
    text: string;
    getText: Function
}

function ReduxDemo(props: Props) {
    const { num, text } = props;
    const { getText } = props;

    useEffect(() => {
        setTimeout(() => {
            getText('momo酱的到来');
        }, 3000);
    }, []);

    return (
        <Layout>
            <div>
                <header>
                    <h1>{text}</h1>
                </header>
            </div>  
        </Layout>    
    );
}

const mapStateToProps = (state) => {
    return { num: state.num, text: state.text };
}

const mapDispatchToProps = dispatch => {
    return {
        getText(text) {
            dispatch(addText(text));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemo);
