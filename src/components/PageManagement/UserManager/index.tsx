import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import Image from 'next/image';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import InputUploadImage from '@components/InputUploadImage';
import InputRate from '@components/UI/InputRate';
import InputTextarea from '@components/UI/InputTextarea';
import Text from '@components/UI/Text';

import styles from './index.module.scss';


const UserManager = ({ form }: any) => {
  const onDragEnd = ({ destination, source }: any) => {
    if (!destination) { return; }

    const { setFieldsValue, getFieldValue } = form;
    const users = getFieldValue('users') || [];

    const [removed] = users?.splice(source.index, 1);
    users.splice(destination.index, 0, removed);

    setFieldsValue({ users });
  };

  return (
    <div className={styles.container}>
      <Text type='font-18-600'>Đánh giá từ người dùng</Text>
      <div className={styles.content}>
        <Row gutter={16} style={{ marginBottom: '-8px' }}>
          <div style={{ width: '44px' }}>
          </div>
          <Col span={5}>
            <Text type='font-14-400'>Họ và tên</Text>
          </Col>
          <Col span={5}>
            <Text type='font-14-400'>Avatar</Text>
          </Col>
          <Col span={5}>
            <Text type='font-14-400'>Star</Text>
          </Col>
          <Col span={5}>
            <Text type='font-14-400'>Mô tả</Text>
          </Col>
        </Row>

        <Form.List name="users">
          {(fields, { add, remove }) => (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided: any) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Draggable
                        key={key}
                        draggableId={key.toString()}
                        index={index}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              padding: '8px',
                              background: snapshot.isDragging ? '#f5f5f5' : 'transparent',
                              borderRadius: '8px'
                            }}
                          >
                            <Row gutter={16}>
                              <div
                                {...provided.dragHandleProps}
                                className={styles.iconDrag}
                              >
                                <Image alt='' width={10} height={16} src={'/svgIcon/ic-drag.svg'} />
                              </div>
                              <Col span={5}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'name']}
                                  className={styles.formList}
                                  rules={[{ required: true, message: 'Họ và tên không được bỏ trống' }]}
                                >
                                  <InputTextarea
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    size='large'
                                    placeholder='Họ và tên'
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={5}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  name={[name, 'avatar']}
                                  rules={[{ required: true, message: 'Avatar không được bỏ trống' }]}
                                >
                                  <InputUploadImage />

                                </Form.Item>
                              </Col>
                              <Col span={5}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  name={[name, 'rate']}
                                >
                                  <InputRate />
                                </Form.Item>
                              </Col>
                              <Col span={5}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  name={[name, 'content']}
                                  rules={[{ required: true, message: 'Mô tả không được bỏ trống' }]}

                                >
                                  <InputTextarea
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                    size='large'
                                    placeholder='Mô tả'
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={1}>
                                <div
                                  className={styles.btn}

                                >
                                  <Button
                                    size='large'
                                    shape="circle"
                                    type="text"
                                    onClick={() => remove(name)}
                                    icon={<Image alt='' src={'/svgIcon/ic-delete-red.svg'} width={14} height={14} />}
                                  />
                                </div>

                              </Col>
                            </Row>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Button
                className={styles.button}
                type="text"
                onClick={() => add()}
                block
                icon={<PlusOutlined style={{ color: '#2AA98B' }} />}
              >
                Thêm dòng
              </Button>
            </DragDropContext>
          )}
        </Form.List>
      </div>
    </div>
  );
};

export default UserManager;