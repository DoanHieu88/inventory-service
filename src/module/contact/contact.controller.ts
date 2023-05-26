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
import { ContactService } from './contact.service';
import { ContactDto, SearchContactDto } from './contact.dto';

@ApiTags('Conact')
@Controller('/api/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  public getAllConact(@Query() filter: SearchContactDto) {
    return this.contactService.getAllContact(filter);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public delete(@Param('id') id: string) {
    return this.contactService.deleteById(id);
  }
}
@ApiTags('app/contact')
@Controller('app/contact')
export class AppContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  public createBlog(@Body() payload: ContactDto) {
    return this.contactService.createContact(payload);
  }
}
