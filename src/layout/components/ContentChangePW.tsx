import { Form, Input } from 'antd';

import { useTranslation } from 'react-i18next';

type Props = {
  form: any;
  onFinish: any;
};

export default function ContentChangePW({ form, onFinish }: Props) {
  const { t } = useTranslation('administrator');

  return (
    <div className='flex flex-col'>
      <span className='text-[16px] font-medium self-center mb-8'>비밀번호 변경</span>
      <Form form={form} onFinish={onFinish}>
        <div className='flex items-center gap-12 w-full mb-4'>
          <span className='text-[15px]  font-medium text-gray-06 flex gap-8 w-24 my-auto'>
            새 비밀번호 {/*New Password*/}
          </span>

          <div className='flex w-[180px] md:!w-[280px]'>
            <Form.Item
              name='password'
              className='!my-auto w-full'
              rules={[
                {
                  required: true,
                  message: t('PLEASE_ENTER_PASSWORD'),
                },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
                  message: t('PASSWORD_RULE'),
                },
              ]}
            >
              <Input.Password
                type='password'
                className='w-full h-10 border border-gray-300 rounded-md'
                placeholder={t('ENTER_PASSWORD')}
              />
            </Form.Item>
          </div>
        </div>

        <div className='flex items-center gap-12 w-full'>
          <span className='text-[15px]  font-medium text-gray-06 flex gap-8 w-24 my-auto'>
            비밀번호 확인 {/*verify password*/}
          </span>

          <div className='flex w-[180px] md:!w-[280px]'>
            <Form.Item
              name='confirmPassword'
              className='!my-auto  w-full'
              rules={[
                {
                  required: true,
                  message: t('PLEASE_RE_ENTER_PASSWORD'),
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('PASSWORDS_DO_NOT_MATCH')));
                  },
                }),
              ]}
            >
              <Input.Password
                type='password'
                className='w-full h-10 border border-gray-300 rounded-md'
                placeholder={t('RE_ENTER_PASSWORD')}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
