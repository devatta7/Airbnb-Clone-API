import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentAccount } from '../auth/decorators/current-account.decorators';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRole } from '../auth/roles/roles.constant';
import type { IPrincipal } from '../auth/interfaces/principal.interface';
import { ApiTag } from '../common/swagger/constant';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';
import { FindAllUnitsDto } from './dtos/find-all-units.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { Public } from '../auth/decorators/public.decorator';
import { UnitsService } from './units.service';
import { MaxFileCount } from '../common/files/constants/file-count.constants';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createParseFilePipe } from '../common/files/file-validation-factory';
import { FilesUploadService } from '../files-upload/files-upload.service';
import { MulterFile } from '../files-upload/storage/types/multer-file.type';
import { DeleteUnitPhotosDto } from './dtos/delete-unit-photos.dto';

@ApiTags(ApiTag.UNITS)
@Controller('units')
export class UnitsController {
  constructor(
    private readonly unitsService: UnitsService,
    private readonly filesUploadService: FilesUploadService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', MaxFileCount.UNITS_IMAGES))
  @Roles(UserRole.USER)
  @ApiCreatedResponse({ type: UnitResponseDto })
  async create(
    @UploadedFiles(createParseFilePipe('2MB', ['jpeg', 'pdf', 'png']))
    photos: MulterFile[],
    @Body() body: CreateUnitDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<UnitResponseDto> {
    const uploadPhotoUrls =
      await this.filesUploadService.uploadMultipleFiles(photos);
    body.photos = uploadPhotoUrls;
    return this.unitsService.create(body, account.user);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  @ApiOkResponse({ type: UnitResponseDto })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateUnitDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<UnitResponseDto> {
    return this.unitsService.update(id, body, account.user);
  }

  @Patch(':id/activate')
  @Roles(UserRole.USER)
  @ApiOkResponse({ type: UnitResponseDto })
  activate(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentAccount() account: IPrincipal,
  ): Promise<UnitResponseDto> {
    return this.unitsService.activate(id, account.user);
  }

  @Patch(':id/deactivate')
  @Roles(UserRole.USER)
  @ApiOkResponse({ type: UnitResponseDto })
  deactivate(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentAccount() account: IPrincipal,
  ): Promise<UnitResponseDto> {
    return this.unitsService.deactivate(id, account.user);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  delete(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentAccount() account: IPrincipal,
  ): Promise<void> {
    return this.unitsService.delete(id, account.user);
  }

  @Get()
  @Public()
  @ApiOkResponse({ description: 'Paginated list of units' })
  findAll(
    @Query() query: FindAllUnitsDto,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    return this.unitsService.findAll(query);
  }

  @Get('me')
  @Roles(UserRole.USER)
  @ApiOkResponse({ description: "Paginated list of the current user's units" })
  findCurrentUserUnits(
    @Query() query: FindAllUnitsDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    return this.unitsService.findCurrentUserUnits(query, account.user);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: UnitResponseDto })
  findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<UnitResponseDto> {
    return this.unitsService.findOne(id);
  }

  @Roles(UserRole.USER)
  @Delete(':id/photos')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  deleteUnitPhotos(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: DeleteUnitPhotosDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<void> {
    return this.unitsService.deleteUnitPhotos(id, body, account.user);
  }

  @Roles(UserRole.USER)
  @Patch(':id/photos')
  @UseInterceptors(FilesInterceptor('photos', MaxFileCount.UNITS_IMAGES))
  async updateUnitPhotos(
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFiles(createParseFilePipe('2MB', ['jpeg', 'pdf', 'png']))
    photos: MulterFile[],
    @CurrentAccount() account: IPrincipal,
  ): Promise<UnitResponseDto> {
    return this.unitsService.updateUnitPhotos(id, account.user, photos);
  }
}
