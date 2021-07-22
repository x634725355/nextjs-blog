import React, { useState } from "react";
import { Form, Select } from 'antd';
import Head from "next/head";
import FormExtract from "../../components/formExtract/formExtract";

const { Option } = Select;

export default function FormDemo(props: csc.Props) {
    const [form] = Form.useForm();
    const [data, setData] = useState();
    


    return (
        <div>
            <h2>打开控制台查看效果哦</h2>

            <Head>{ data }</Head>

            <Form form={form} onValuesChange={() => { setData(form.getFieldsValue()); console.log("让你康康哦", form.getFieldsValue()) }} >
                <FormExtract
                    form={form}
                    config={[
                        { name: 'shipCode', keyName: ['momo', 'shipName', 'a'] },
                    ]}
                >
                    <Form.Item name="shipCode" label="shipCode">
                        <Select>
                            <Option key="EA" value="TPM_SEA" shipName="SEA">SEA</Option>
                            <Option key="AR" value="TPM_AIR" shipName="AIR">AIR</Option>
                        </Select>
                    </Form.Item>
                </FormExtract>
            </Form>
        </div>
    );
}