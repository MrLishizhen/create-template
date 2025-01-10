import { Form, Row, Col, Input, Button, Select, InputNumber } from 'antd';
import type { InputProps, ButtonProps, SelectProps, InputNumberProps } from 'antd';
import type { TextAreaProps } from 'antd/lib/input';
import { renderFormItems } from './utils';
import type { FormItemProps, FormProps } from 'antd';
import { ReactNode, useMemo } from 'react';
const { TextArea } = Input;

type FieldType = 'select' | 'input' | 'button' | 'textarea' | 'input_number';

type WidgetPropsMap = {
  input: InputProps;
  button: ButtonProps;
  select: SelectProps;
  input_number: InputNumberProps;
  textarea: TextAreaProps;
  // 其他组件的 props 类型...
};

export type Fields = {
  label: ReactNode;
  widget: FieldType;
  colSpan: number;
  widgetProps?: WidgetPropsMap[FieldType];
  widgetItemProps?: Omit<FormItemProps, 'label'>;
  widgetRender?: () => ReactNode;
};

export type SearchProps = {
  col?: number;
  fields: Fields[];
  formProps: FormProps;
};

const Search = (props: SearchProps) => {
  const { col = 4, fields = [], formProps } = props;

  const fieldsMemo = useMemo(() => {
    return renderFormItems(fields, col);
  }, [fields, col]);

  return (
    <Form {...formProps}>
      {fieldsMemo.map((item, i) => {
        return (
          <Row key={i} gutter={[16, 16]}>
            {item.map((u, j) => {
              return (
                <Col key={j} span={Math.floor((24 / col) * u.colSpan)}>
                  {u.widget === 'input' ? (
                    <Form.Item label={u.label} {...u.widgetItemProps}>
                      <Input {...(u.widgetProps as InputProps)} />
                    </Form.Item>
                  ) : (
                    ''
                  )}
                  {u.widget === 'button' ? (
                    <Form.Item {...u.widgetItemProps}>
                      {u.widgetRender ? (
                        u.widgetRender()
                      ) : (
                        <Button {...(u.widgetProps as ButtonProps)}>{u.label}</Button>
                      )}
                    </Form.Item>
                  ) : (
                    ''
                  )}
                  {u.widget === 'select' ? (
                    <Form.Item label={u.label} {...u.widgetItemProps}>
                      <Select {...(u.widgetProps as SelectProps)} />
                    </Form.Item>
                  ) : (
                    ''
                  )}
                  {u.widget === 'textarea' ? (
                    <Form.Item label={u.label} {...u.widgetItemProps}>
                      <TextArea {...(u.widgetProps as TextAreaProps)} />
                    </Form.Item>
                  ) : (
                    ''
                  )}
                  {u.widget === 'input_number' ? (
                    <Form.Item label={u.label} {...u.widgetItemProps}>
                      <InputNumber {...(u.widgetProps as InputNumberProps)} />
                    </Form.Item>
                  ) : (
                    ''
                  )}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Form>
  );
};

export default Search;
