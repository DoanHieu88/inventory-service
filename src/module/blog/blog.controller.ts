import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogDto, SearchBlogDto } from './blog.dto';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('/api/blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  public createBlog(@Body() payload: BlogDto) {
    return this.blogService.createBlog(payload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  public getAllBlog(@Query() filter: SearchBlogDto) {
    return this.blogService.getAllBlog(filter);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public delete(@Param('id') id: string) {
    return this.blogService.deleteById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Post(':id')
  public async update(@Param('id') id: string, @Body() payload: BlogDto) {
    return await this.blogService.update(id, payload);
  }
}
@ApiTags('app/blog')
@Controller('app/blog')
export class AppBlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  public getAllApp(@Query() filter: SearchBlogDto) {
    return this.blogService.getAllBlogApp(filter);
  }

  @Get(':url')
  public getBlogByUrl(@Param('url') url: string) {
    return this.blogService.getBlogByUrl(url);
  }
}
