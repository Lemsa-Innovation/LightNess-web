import { Blog as BlogType } from "@shared/index";
import { DefaultFirestoreTypes, WithRef } from "../../modules/types";

export type Blog = WithRef<BlogType<DefaultFirestoreTypes>>;
