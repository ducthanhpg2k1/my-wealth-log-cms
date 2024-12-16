import { useRef, useState } from 'react';

import { Spin } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';

import Text from '@components/UI/Text';
import { openNotification } from '@utils/common';

import styles from './index.module.scss';
import { useUploadImage } from './service';



const InputUploadImage = ({ onChange }: any) => {
  const fileInputRef: any = useRef(null);

  const [urlImage, setUrlImage] = useState('')

  const requestUploadImage = useUploadImage({
    onSuccess: (res) => {
      // const fileName = res?.fileUrl.split('/').pop();
      // const newData = {
      //   url: res?.fileUrl,
      //   fileName,
      // };
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