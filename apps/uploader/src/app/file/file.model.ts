import { File } from '@project/shared/app-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'files',
  timestamps: true
})
export class FileModel extends Document implements File {
  @Prop({
    required: true,
  })
  public originalName: string;

  @Prop({
    required: true
  })
  public hashName: string;

  @Prop({
    required: true,
  })
  public mimetype: string;

  @Prop({
    required: true,
  })
  public path: string;

  @Prop({
    required: true,
  })
  public size: number;

  @Prop({
    required: true,
  })
  public appName: string;

  @Prop({
    required: true,
  })
  public objectId: string;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
