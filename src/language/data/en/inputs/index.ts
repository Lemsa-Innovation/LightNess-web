import { Inputs } from "@/language/structure/inputs";

export const inputs: Inputs = {
  users: {
    labels: {
      title: "Users",
      empty: "No users available",
    },
    fields: {
      firstName: {
        label: "First Name",
        placeholder: "Enter first name",
      },
      lastName: {
        label: "Last Name",
        placeholder: "Enter last name",
      },
      email: {
        label: "Email",
        placeholder: "Enter email",
      },
      phoneNumber: {
        label: "Phone Number",
        placeholder: "Enter phone number",
      },
      role: {
        label: "Role",
        placeholder: "Select role",
      },
    },
    actions: {
      addUser: {
        label: "Add User",
        header: "Add New User",
        description: "Create a new user account",
        toast: {
          success: "User added successfully",
          error: "Failed to add user. Please try again.",
        },
        confirmation: {
          title: "Confirm Creation",
          message: "Are you sure you want to create this user?",
        },
      },
      updateUser: {
        label: "Update User",
        header: "Update User",
        description: "Modify user information",
        toast: {
          success: "User updated successfully",
          error: "Failed to update user. Please try again.",
        },
        confirmation: {
          title: "Confirm Update",
          message: "Are you sure you want to update this user?",
        },
      },
      deleteUser: {
        label: "Delete User",
        header: "Delete User",
        description: "Remove user from the system",
        toast: {
          success: "User deleted successfully",
          error: "Failed to delete user. Please try again.",
        },
        confirmation: {
          title: "Confirm Deletion",
          message: "Are you sure you want to delete this user?",
        },
      },
    },
  },
  suggestions: {
    labels: {
      title: "Suggestions",
      empty: "No suggestions available",
    },
  },
  attachements: {
    labels: {
      title: "Attachments",
      empty: "No attachments available",
    },
  },
  deathDeclarations: {
    labels: {
      title: "Death Declarations",
      declaredBy: "Declared by",
      placeOfDeath: "Place of death",
      dateOfDeath: "Date of death",
      empty: "No death declarations available",
    },
    actions: {
      rejectDeclaration: {
        label: "Reject Declaration",
        description: "Reject the submitted death declaration.",
        confirmation: {
          title: "Confirm Rejection",
          message: "Are you sure you want to reject this death declaration?",
        },
        toast: {
          success: "Declaration rejected successfully.",
          error: "Failed to reject declaration. Please try again.",
        },
      },
      validateDeclaration: {
        label: "Validate Declaration",
        description: "Approve and validate the submitted death declaration.",
        confirmation: {
          title: "Confirm Validation",
          message: "Are you sure you want to validate this death declaration?",
        },
        toast: {
          success: "Declaration validated successfully.",
          error: "Failed to validate declaration. Please try again.",
        },
      },
    },
  },
  commons: {
    name: {
      label: "Name",
      placeholder: "Enter name",
    },
    isActive: {
      label: "Activate or deactivate the element",
    },
    searchByName: {
      label: "Search by name...",
    },
    gender: {
      label: {
        unique: "Select a gender",
        multiple: "Select one or more genders",
      },
      values: {
        men: "Male",
        women: "Female",
        kids: "Children",
      },
    },
    choice: {
      yes: "Yes",
      no: "No",
    },
  },
  blogs: {
    labels: {
      title: "Blogs",
      empty: "No blogs available",
    },
    steps: {
      description: {
        title: "General Information",
        description:
          "Start by entering the essential blog information such as title, reading time, and whether it should be featured.",
      },
      coverImage: {
        title: "Cover Image",
        description:
          "Add an attractive cover image. It must be well-designed, relevant and not exceed 3.1 MB. Accepted formats: JPG, PNG or WebP.",
      },
      content: {
        title: "Content",
        description:
          "Write or paste your blog content using our rich text editor. Feel free to structure your article with headings, lists, images or links.",
      },
    },
    fields: {
      language: {
        label: "Language",
        description: "Select the blog language",
      },
      category: {
        label: "Category",
        placeholder: "Select a category",
      },
      title: {
        label: "Title",
        placeholder: "Enter title",
      },
      content: {
        label: "Content",
        placeholder: "Enter content",
      },
      image: {
        label: "Image",
        placeholder: "Select an image",
      },
      tags: {
        label: "Tags",
        placeholder: "Enter tags",
      },
      isFeatured: {
        label: "Feature",
        description: "Feature the blog",
      },
      readTime: {
        label: "Reading Time",
        placeholder: "Enter reading time",
      },
      author: {
        label: "Author",
        placeholder: "Enter author",
      },
      coverImageUrl: {
        label: "Cover Image",
        rules: {
          isRequired: "Cover image is required",
        },
        placeholder: {
          update: "Update cover image",
          upload: "Upload cover image",
        },
        toastUploading: {
          success: "Cover image uploaded successfully.",
          error: "Failed to upload cover image.",
        },
      },
    },
    actions: {
      updateBlog: {
        label: "Update Blog",
        header: "Update Blog",
        description: "Modify existing blog information and save your changes.",
        confirmation: {
          title: "Confirm Update",
          message: "Do you really want to save the changes to this blog?",
        },
        toast: {
          success: "Blog updated successfully.",
          error:
            "Failed to update blog. Please check the fields and try again.",
        },
      },
      addBlog: {
        label: "Add Blog",
        header: "Create New Blog",
        description:
          "Create a new blog by completing the necessary information.",
        confirmation: {
          title: "Confirm Creation",
          message: "Are you sure you want to publish this new blog?",
        },
        toast: {
          success: "Blog added successfully.",
          error: "Unable to add blog. Check the information and try again.",
        },
      },
      deleteBlog: {
        label: "Delete Blog",
        header: "Delete Blog",
        description: "Are you sure you want to delete this blog?",
        confirmation: {
          title: "Confirm Deletion",
          message: "Are you sure you want to delete this blog?",
        },
        toast: {
          success: "Blog deleted successfully.",
          error: "Failed to delete blog. Please try again.",
        },
      },
    },
  },
  announcements: {
    labels: {
      title: "Announcements",
      empty: "No announcements available",
    },
    actions: {
      deleteAnnouncement: {
        label: "Delete Announcement",
        header: "Delete Announcement",
        description: "Are you sure you want to delete this announcement?",
        toast: {
          success: "Announcement deleted successfully.",
          error: "Failed to delete announcement. Please try again.",
        },
        confirmation: {
          title: "Confirm Deletion",
          message: "Are you sure you want to delete this announcement?",
        },
      },
      addAnnouncement: {
        label: "Add Announcement",
        header: "Add Announcement",
        toast: {
          success: "Announcement added successfully.",
          error: "Failed to add announcement. Please try again.",
        },
      },
      updateAnnouncement: {
        label: "Update Announcement",
        header: "Update Announcement",
        description: "Modify existing announcement information.",
        confirmation: {
          title: "Confirm Update",
          message: "Are you sure you want to update this announcement?",
        },
        toast: {
          success: "Announcement updated successfully.",
          error: "Failed to update announcement. Please try again.",
        },
      },
    },
    fields: {
      bannerImage: {
        label: "Banner Image",
        placeholder: {
          update: "Update banner image",
          upload: "Upload banner image",
        },
        toastUploading: {
          success: "Banner image uploaded successfully.",
          error: "Failed to upload banner image.",
        },
        rules: {
          isRequired: "Banner image is required",
        },
      },
      fullImage: {
        label: "Full Image",
        placeholder: {
          update: "Update full image",
          upload: "Upload full image",
        },
        toastUploading: {
          success: "Full image uploaded successfully.",
          error: "Failed to upload full image.",
        },
        rules: {
          isRequired: "Full image is required",
        },
      },
    },
  },
  funeralCompanies: {
    labels: {
      title: "Funeral Companies",
      empty: "No funeral companies available",
    },
  },
  cemeteries: {
    labels: {
      title: "Cemeteries",
      empty: "No cemeteries available",
    },
  },
  washers: {
    labels: {
      title: "Grave Washers",
      empty: "No grave washers available",
    },
    actions: {
      updateWasher: {
        label: "Update Washer",
        header: "Update Washer",
        description: "Modify grave washer information.",
        confirmation: {
          title: "Confirm Update",
          message: "Are you sure you want to update this washer?",
        },
        toast: {
          success: "Washer updated successfully.",
          error: "Failed to update washer. Please try again.",
        },
      },
      validateWasher: {
        label: "Validate Washer",
        header: "Validate Washer",
        toast: {
          success: "Washer validated successfully.",
          error: "Failed to validate washer. Please try again.",
        },
      },
    },
  },
};
