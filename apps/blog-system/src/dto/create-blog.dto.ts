import { IsNotEmpty } from 'class-validator';

export class createBlogDto {
  @IsNotEmpty({
    message: '序图不能为空',
  })
  image: string;

  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string;

  desc: string;

  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;
  @IsNotEmpty({
    message: '状态不能为空',
  })
  published: boolean;
}
