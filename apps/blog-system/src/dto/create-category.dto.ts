import { IsNotEmpty } from 'class-validator';

export class createCategoryDto {
  @IsNotEmpty({
    message: '密钥不能为空',
  })
  key: string;

  @IsNotEmpty({
    message: '名称不能为空',
  })
  name: string;
}
