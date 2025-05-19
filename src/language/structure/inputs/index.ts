import { Attachements, ImageField } from "./attachements";
import { Suggestions } from "./suggestions";
import { Users } from "./users";
export type ToastContents = {
  error: string;
  success: string;
};
export interface Field {
  label: string;
  placeholder?: string;
  description?: string;
}
export interface FieldWithValues extends Field {
  values: Record<string, string>;
}

export interface AutocompleteField extends Field {
  labels: {
    noResult: string;
  };
}
export interface Action {
  label?: string;
  header?: string;
  toast: ToastContents;
  confirmation?: {
    title: string;
    message: string;
  };
  description?: string;
}

export interface Inputs {
  users: Users;
  suggestions: Suggestions;
  attachements: Attachements;
  blogs: {
    labels: {
      title: string;
      empty: string;
    };
    steps: {
      description: {
        title: string;
        description: string;
      };
      coverImage: {
        title: string;
        description: string;
      };
      content: {
        title: string;
        description: string;
      };
    };
    actions: {
      addBlog: Action;
      updateBlog: Action;
      deleteBlog: Action;
    };
    fields: {
      title: Field;
      content: Field;
      image: Field;
      tags: Field;
      category: Field;
      isFeatured: Field;
      readTime: Field;
      author: Field;
      coverImageUrl: ImageField;
    };
  };
  announcements: {
    labels: {
      title: string;
      empty: string;
    };
    fields: {
      bannerImage: ImageField;
      fullImage: ImageField;
    };
    actions: {
      addAnnouncement: Action;
      deleteAnnouncement: Action;
    };
  };
  deathDeclarations: {
    labels: {
      title: string;
      declaredBy: string;
      placeOfDeath: string;
      dateOfDeath: string;
      empty: string;
    };
    actions: {
      validateDeclaration: Action;
      rejectDeclaration: Action;
    };
  };
  funeralCompanies: {
    labels: {
      title: string;
      empty: string;
    };
  };
  cemeteries: {
    labels: {
      title: string;
      empty: string;
    };
  };
  washers: {
    labels: {
      title: string;
      empty: string;
    };
  };

  commons: {
    name: Field;
    isActive: Field;
    searchByName: Field;
    gender: {
      label: {
        unique: string;
        multiple: string;
      };
      values: {
        men: string;
        women: string;
        kids: string;
      };
    };
    choice: {
      yes: string;
      no: string;
    };
  };
}
