import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Row, Switch } from 'antd';
import Image from 'next/image';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import InputUploadImage from '@components/InputUploadImage';
import InputTextarea from '@components/UI/InputTextarea';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

const SettingFooter = ({ form }: { form: FormInstance }) => {
  const onDragEnd = ({ destination, source }: any) => {
    if (!destination) {
      return;
    }

    const { setFieldsValue, getFieldValue } = form;
    const footer = getFieldValue('footer') || [];

    const [removed] = footer?.splice(source.index, 1);
    footer.splice(destination.index, 0, removed);

    setFieldsValue({ footer });
  };

  return (
    <div className={styles.container}>
      <Text type='font-18-600'>Quản lý footer</Text>
      <div className={styles.content}>
        <Row gutter={16} style={{ marginBottom: '-8px' }}>
          <Col span={1}></Col>

          {/* <div style={{ width: '44px' }}></div> */}
          <Col span={5}>
            <Text type='font-14-400'>Tiêu đề</Text>
          </Col>
          <Col span={5}>
            <Text type='font-14-400'>Mô tả</Text>
          </Col>
          <Col span={3}>
            <Text type='font-14-400'>Hình ảnh</Text>
          </Col>
          <Col span={2}>
            <Text type='font-14-400'>Facebook url</Text>
          </Col>
          <Col span={2}>
            <Text type='font-14-400'>Youtube url</Text>
          </Col>
          <Col span={2}>
            <Text type='font-14-400'>Tiktok url</Text>
          </Col>
          <Col span={2}>
            <Text className={styles.textRequired} type='font-14-400'>
              Hiện
            </Text>
          </Col>
        </Row>

        <Form.List name='footer'>
          {(fields, { remove, add }) => (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided: any) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Draggable key={key} draggableId={key.toString()} index={index}>
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              padding: '8px',
                              background: snapshot.isDragging ? '#f5f5f5' : 'transparent',
                              borderRadius: '8px',
                            }}
                          >
                            <Row gutter={16}>
                              <Col span={1}>
                                <div {...provided.dragHandleProps} className={styles.iconDrag}>
                                  <Image
                                    alt=''
                                    width={10}
                                    height={16}
                                    src={'/svgIcon/ic-drag.svg'}
                                  />
                                </div>
                              </Col>

                              <Col span={5}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'title']}
                                  className={styles.formList}
                                  rules={[
                                    { required: true, message: 'Tiêu đề không được bỏ trống' },
                                  ]}
                                >
                                  <InputTextarea
                                    autoSize={{ minRows: 6, maxRows: 6 }}
                                    size='large'
                                    placeholder='Thêm tiêu đề'
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={5}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  name={[name, 'description']}
                                  rules={[{ required: true, message: 'Mô tả không được bỏ trống' }]}
                                >
                                  <InputTextarea
                                    autoSize={{ minRows: 6, maxRows: 6 }}
                                    size='large'
                                    placeholder='Thêm mô tả'
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={3}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  rules={[{ required: true, message: 'Hình không được bỏ trống' }]}
                                  name={[name, 'image']}
                                >
                                  <InputUploadImage />
                                </Form.Item>
                              </Col>

                              <Col span={2}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  name={[name, 'url_facebook']}
                                >
                                  <InputTextarea
                                    autoSize={{ minRows: 6, maxRows: 6 }}
                                    size='large'
                                    placeholder='Nhập url facebook'
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={2}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  name={[name, 'url_youtube']}
                                >
                                  <InputTextarea
                                    autoSize={{ minRows: 6, maxRows: 6 }}
                                    size='large'
                                    placeholder='Nhập url youtube'
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={2}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  name={[name, 'url_tiktok']}
                                >
                                  <InputTextarea
                                    autoSize={{ minRows: 6, maxRows: 6 }}
                                    size='large'
                                    placeholder='Nhập url tiktok'
                                  />
                                </Form.Item>
                              </Col>

                              <Col span={2}>
                                <Form.Item
                                  {...restField}
                                  className={styles.formList}
                                  valuePropName='checked'
                                  name={[name, 'required']}
                                >
                                  <Switch className={styles.switch} />
                                </Form.Item>
                              </Col>
                              <Col span={1}>
                                <div className={styles.btn}>
                                  <Button
                                    size='large'
                                    shape='circle'
                                    type='text'
                                    onClick={() => remove(name)}
                                    icon={
                                      <Image
                                        alt=''
                                        src={'/svgIcon/ic-delete-red.svg'}
                                        width={14}
                                        height={14}
                                      />
                                    }
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
              {fields?.length < 1 && (
                <Button
                  className={styles.button}
                  type='text'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined style={{ color: '#2AA98B' }} />}
                >
                  Thêm dòng
                </Button>
              )}
            </DragDropContext>
          )}
        </Form.List>
      </div>
    </div>
  );
};

export default SettingFooter;
