import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Form, Input, Select } from 'antd';
// import FormExtract from "../../components/formExtract/formExtract";
import Layout from "../../components/Layout/layout";
import FormExtract from "@jusda-tools/jusda-extract/src/index";

const { Option } = Select;

const MomoRef = forwardRef((props: any, ref) => {
    const { onChange, value, name } = props;

    return (
        <div>
            <div>
                <Select ref={ref as any} onChange={(e) => onChange(e)} value={value} >
                    <Option key="EA" value="TPM_SEA" shipname="SEA">SEA</Option>
                    <Option key="AR" value="TPM_AIR" shipname="AIR">AIR</Option>
                </Select>
            </div>
        </div>
    )
});

class MomoClassRef extends React.Component {
    ref: any;
    constructor(props: any) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        return (
            <div>
                <div>
                    <Select ref={this.ref} onChange={(e) => this.props.onChange(e)} value={this.props.value} >
                        <Option key="EA" value="TPM_SEA" shipname="SEA">SEA</Option>
                        <Option key="AR" value="TPM_AIR" shipname="AIR">AIR</Option>
                    </Select>
                </div>
            </div>
        );
    }
}


const Momo = (props: any) => {
    const { onChange, value } = props;

    return (
        <div>
            <div>
                <div>
                    <Select onChange={(e) => onChange(e)} value={value} >
                        <Option key="EA" value="TPM_SEA" shipname="SEA">SEA</Option>
                        <Option key="AR" value="TPM_AIR" shipname="AIR">AIR</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
};



export default function FormDemo(props: csc.Props) {
    const [form] = Form.useForm();
    const [data, setData] = useState({});
    const form1 = useRef(null);

    const onValuesChange = () => {
        setData({ ...form.getFieldsValue() });
        console.log("让你康康哦", form.getFieldsValue())
    }

    useEffect(() => {
        // console.log('momo', shipCode, form1);
    }, []);

    return (
        <Layout>
            <div>
                <h2>打开控制台查看效果哦</h2>
               
                <h1>{JSON.stringify(data)}</h1>

                <button onClick={() => console.log(form.getFieldsValue())} >点我查看效果</button>

                <div ref={form1} >
                    <Form form={form} onValuesChange={onValuesChange} >
                        <FormExtract
                            form={form}
                            config={[
                                { name: 'shipCode', keyName: ['shipname'] },
                                { name: 'select', keyName: ['momo'] },
                            ]}
                        >
                            <Form.Item name="shipCode" label="shipCode">
                                {/* {FormExtract.Item(<MomoRef />)} */}
                            </Form.Item>
                            <Form.Item name="momo" label="momo">
                                {/* {FormExtract.Item(MomoRef)} */}
                            </Form.Item>
                            <Form.Item name="select" label="select">
                                <Select>
                                    <Option key="EA" value="TPM_SEA" momo="SEA">SEA</Option>
                                    <Option key="AR" value="TPM_AIR" momo="AIR">AIR</Option>
                                </Select>
                            </Form.Item>
                        </FormExtract>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}