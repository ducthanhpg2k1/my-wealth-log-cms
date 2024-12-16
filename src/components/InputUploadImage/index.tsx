import { useEffect, useRef, useState } from 'react';

import { Form, Spin } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';

import Text from '@components/UI/Text';
import { openNotification } from '@utils/common';

import styles from './index.module.scss';
import { useUploadImage } from './service';



const InputUploadImage = ({ onChange, value }: any) => {
  const fileInputRef: any = useRef(null);
  const [urlImage, setUrlImage] = useState('')

  useEffect(() => {
    if (value) {
      setUrlImage(value)
    }
  }, [value])

  const { errors } = Form.Item.useStatus();



  const requestUploadImage = useUploadImage({
    onSuccess: (res) => {
      setUrlImage(res?.fileUrl)
      onChange(res?.fileUrl)
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const handleFileChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    requestUploadImage?.run(uploadedFile, 'notification');
  };



  return (
    <Spin spinning={requestUploadImage.loading}>
      <div className={classNames(styles.containerInput, {
        [styles.containerImge]: urlImage,
        [styles.errorInput]: errors?.length > 0,

      })}

      onClick={() => fileInputRef.current.click()}>
        {
          urlImage
            ? (
              <div className={styles.containerImage}>
                <Image
                  src={
                    urlImage || ''
                  }
                  alt=''
                  width={72}
                  height={48}

                />
              </div>

            )
            : (
              <Text type='font-14-400' className={styles.text}>Thêm hình ảnh</Text>

            )
        }

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
        />
      </div>
    </Spin>
  )
}
export default InputUploadImage