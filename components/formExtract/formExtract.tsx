import React, { ReactNode } from 'react';
import { Form, Input } from 'antd';
import { ExtractItem } from "./extractItem";

interface Props {
    children?: ReactNode | any;
    form: any;
    config?: { name: string; keyName: string[] }[];
}

const formExtract = (props: Props) => {
    const { children, form, config } = props;

    const formItemArr: { name: string; keyName: string }[] = [];

    // 获取渲染 Form Item 数组
    config?.forEach(configItem => {
        configItem.keyName.forEach(keyName => {
            formItemArr.push({ name: configItem.name, keyName });
        });
    });

    function getterValue({ name, keyName, selectNodeValue }: any) { 
        let formItemNode = form.getFieldInstance(name);

        if (formItemNode?.ref?.current) {
            formItemNode = formItemNode?.ref?.current;
        }
        
        const mode = formItemNode?.props?.mode;

        // 获取SelcetOption节点
        const getterNodes = formItemNode.props.children;

        switch (mode) {
            case 'multiple':
                // 重置保存多选值的formItem
                form.setFieldsValue({ [keyName]: "" });

                getterNodes.filter(
                    (node: any) => selectNodeValue.includes(node.props.value)
                ).forEach((getterNode: any) => {
                    form.setFieldsValue({
                        [keyName]: { [getterNode.props.value]: getterNode.props[keyName] }
                    });
                })
                break;
            default:
                form.setFieldsValue({
                    [keyName]: getterNodes.find(
                        (node: any) => node.props.value === selectNodeValue,
                    )?.props[keyName],
                });
                break;
        }

        return true;
    }

    return (
        <div>
            {formItemArr?.map((formItem, index) => {
                return (
                    <Form.Item
                        noStyle
                        key={`${formItem.keyName}-${index}`}
                        name={`${formItem.keyName}`}
                        shouldUpdate={(prevValues, curValues) => {    
                            if (prevValues[formItem.name] === curValues[formItem.name]) return false;
                          
                            return getterValue({
                                ...formItem,
                                selectNodeValue: curValues[formItem.name],
                            });
                        }}
                    >
                        <Input style={{ display: 'none' }}></Input>
                    </Form.Item>
                );
            })}
            {children}
        </div>
    );
};

formExtract.Item = ExtractItem;

export default formExtract;
